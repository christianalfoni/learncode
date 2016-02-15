function getCourse({input, output, services}) {
  services.http.get(`/API/courses/${input.courseId}`)
    .then((response) => {
      output({
        course: response.result
      });
    }).catch(() => {
      output({
        courseError: 'Kunne ikke hente kurs'
      });
    });
}

export default getCourse;
