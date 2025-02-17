const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
        <div className="text-center">
          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          {/* Not Found Message */}
          <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
          <p className="text-lg mt-2 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Back to Home Button */}
          <a
            href="/"
            className="mt-8 inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
