import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1>Nothing Found.</h1>
      <p>
        <Link to="/">Go to Home Page.</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
