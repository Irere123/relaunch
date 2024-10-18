export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        An{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/irere123/relaunch"
          target="_blank"
        >
          open-source
        </a>{" "}
        project built by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/irere123"
          target="_blank"
        >
          Irere Emmanuel
        </a>
      </p>
    </div>
  );
}
