import React from 'react';
import PlayButton from './SceneControls/PlayButton.js';
import RecordButton from './SceneControls/RecordButton.js';
import UploadButton from './SceneControls/UploadButton.js';
import styles from './SceneControls.css';
import {Mixin} from 'cerebral-react';
import Recorder from 'chrome-recorder';

// Need access to Cerebral controller, so using normal
// constructor
const SceneControls = React.createClass({
  contextTypes: {
    controller: React.PropTypes.object
  },
  mixins: [Mixin],
  componentWillMount() {
    this.isExecutingSignal = this.context.controller.store.isExecutingAsync();
  },
  componentDidMount() {
    this.recorder = new Recorder(this.refs.video, {
      audio: {
        sampleRate: 44100
      }
    });

    if (this.state.currentScene.recording) {
      this.loadAudioAndVideo();
    }
    this.context.controller.on('change', this.updateIsExecutingSignal);
  },
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.recorder.isEnded && this.state.recorder.isEnded) {
      this.refs.video.removeEventListener('waiting', this.onWaiting);
    }

    if (!this.state.recorder.isRecording && !this.state.recorder.isEnded && prevState.recorder.currentSeek !== this.state.recorder.currentSeek) {
      this.seek();
    }

    if (!this.state.recorder.isRecording && prevState.recorder.isPlaying && !this.state.recorder.isPlaying) {
      this.refs.video.pause();
      this.refs.audio.pause();
    }

    if (!this.state.recorder.isRecording && !prevState.recorder.isPlaying && this.state.recorder.isPlaying) {
      this.refs.video.play();
      this.refs.audio.play();
    }
  },
  componentWillUnmount() {
    this.context.controller.removeListener('change', this.updateIsExecutingSignal);
  },
  recorder: null,
  isUploadReady: false,
  isRecording: false,
  isExecutingSignal: false,
  getStatePaths() {
    return {
      recorder: ['recorder'],
      course: ['course'],
      isAdmin: ['user', 'isAdmin']
    };
  },
  getComputedPaths() {
    return {
      currentScene: ['currentScene']
    };
  },
  updateIsExecutingSignal() {
    const forceUpdate = this.isExecutingSignal !== this.context.controller.store.isExecutingAsync();
    this.isExecutingSignal = this.context.controller.store.isExecutingAsync();

    if (forceUpdate) {
      this.forceUpdate();
    }
  },
  seek() {
    const seek = this.state.recorder.currentSeek[0];
    const continuePlaying = this.state.recorder.isPlaying;
    const self = this;
    const bufferState = {
      video: false,
      audio: false
    };

    this.signals.course.videoStartedBuffering({}, {
      isRecorded: true
    });

    this.refs.video.removeEventListener('waiting', this.onWaiting);
    this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
    this.refs.video.addEventListener('canplaythrough', function startPlaying() {
      bufferState.video = true;

      if (bufferState.audio) {
        if (continuePlaying) {
          self.refs.audio.play();
        }
        self.signals.course.videoBuffered({
          continuePlaying: continuePlaying
        }, {
          isRecorded: true
        });
      } else {
        self.refs.video.pause();
      }
      self.refs.video.removeEventListener('canplaythrough', startPlaying);
      self.refs.video.addEventListener('canplaythrough', self.onCanPlayThrough);
    });

    this.refs.audio.addEventListener('canplaythrough', function startPlaying() {
      bufferState.audio = true;

      if (bufferState.video) {
        if (continuePlaying) {
          self.refs.video.play();
        }
        self.signals.course.videoBuffered({
          continuePlaying: continuePlaying
        }, {
          isRecorded: true
        });
      } else {
        self.refs.audio.pause();
      }
    });

    this.refs.video.currentTime = seek / 1000;
    this.refs.audio.currentTime = seek / 1000;
  },
  createMediaRequest(url) {
    return new Promise((resolve) => {
      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.responseType = 'blob';

      req.onload = () => {
        resolve(req.response);
      };

      req.send();
    });
  },
  loadAudioAndVideo() {
    this.refs.video.addEventListener('canplaythrough', this.onCanPlayThrough);
    this.refs.video.addEventListener('error', this.onError);
    this.refs.video.src = `/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`;
    this.refs.audio.src = `/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`;
  },
  onCanPlayThrough() {
    this.signals.course.mediaLoaded();
    this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
  },
  onWaiting() {
    this.refs.audio.pause();

    this.refs.video.addEventListener('playing', function onPlaying() {
      this.onPlaying();
      this.refs.video.removeEventListener('playing', onPlaying);
    }.bind(this));

    this.signals.course.videoStartedBuffering({}, {
      isRecorded: true
    });
  },
  onPlaying() {
    this.refs.audio.play();
    this.signals.course.playClicked({
      seek: this.state.recorder.currentSeek[0]
    });
  },
  onError() {
    this.refs.video.pause();
    this.refs.audio.pause();
    this.signals.course.videoFailed({}, {
      isRecorded: true
    });
  },
  onRecordClick() {
    this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
    this.refs.video.removeEventListener('waiting', this.onWaiting);
    this.isRecording = true;
    this.recorder.record(() => this.signals.course.recordClicked());
  },
  onStopClick() {
    this.isUploadReady = this.isRecording;
    this.isRecording = false;
    this.signals.course.stopClicked({
      seek: this.refs.video.currentTime * 1000
    });
    setTimeout(() => {
      this.recorder.stop();
      const blobs = this.recorder.getBlobs();
      this.refs.video.src = window.URL.createObjectURL(blobs.video);
      this.refs.audio.src = window.URL.createObjectURL(blobs.audio);
    }, 250);
  },
  onPlayClick() {
    this.signals.course.playClicked({
      seek: this.state.recorder.isEnded ? 0 : this.refs.video.currentTime * 1000
    });
  },
  onPauseClick() {
    this.signals.course.pauseClicked({
      seek: this.refs.video.currentTime * 1000
    }, {
      isRecorded: true
    });
  },
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        file: null
      };
      reader.onload = () => {
        fileInfo.file = new Uint8Array(reader.result);
        resolve(fileInfo);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  },
  onUploadClick() {
    const blobs = this.recorder.getBlobs();
    this.signals.course.uploadClicked();
    Promise.all([
      this.readFile(blobs.audio),
      this.readFile(blobs.video)
    ])
    .then((files) => {
      const audio = files[0];
      const video = files[1];

      return Promise.all([
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`, {
          method: 'post',
          headers: {
            'Content-Type': audio.type,
            'Content-Length': audio.size
          },
          credentials: 'same-origin',
          body: audio.file
        }),
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`, {
          method: 'post',
          headers: {
            'Content-Type': video.type,
            'Content-Length': video.size
          },
          credentials: 'same-origin',
          body: video.file
        })
      ])
      .catch(() => {
        this.signals.course.uploadFailed();
      });
    })
    .then((responses) => {
      // Have to force update due to uploadFinished might
      // not result in an actual state change
      this.isUploadReady = false;
      this.forceUpdate();

      if (responses[0].status === 200 && responses[1].status === 200) {
        this.signals.course.uploadFinished();
      } else {
        throw new Error('Upload failed');
      }
    })
    .catch(() => {
      this.signals.course.uploadFailed();
    });
  },
  render() {
    return (
      <div className={styles.wrapper}>
        <UploadButton
          isUploadReady={this.isUploadReady}
          recorder={this.state.recorder}
          onClick={() => this.onUploadClick()}
        />
        {
          this.state.isAdmin ?
            <RecordButton
              disabled={this.isExecutingSignal || this.state.course.isLoadingMedia}
              recorder={this.state.recorder}
              onRecordClick={() => this.onRecordClick()}
              onStopClick={() => this.onStopClick()}/>
          :
            null
        }
        <PlayButton
          disabled={this.state.recorder.isBuffering || this.isExecutingSignal || this.state.course.isLoadingMedia}
          recorder={this.state.recorder}
          onPlayClick={() => this.onPlayClick()}
          onPauseClick={() => this.onPauseClick()}/>
        <video ref="video" className={this.state.recorder.isBuffering ? styles.loadingFrame : styles.frame}></video>
        <audio ref="audio"></audio>
      </div>
    );
  }
});

export default SceneControls;
