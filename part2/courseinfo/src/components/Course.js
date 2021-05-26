const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return <div>{parts.map((part) => <Part key={part.id} part={part} />)}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
