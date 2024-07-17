export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-white p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Kitso!</h1>
      <p className="text-lg mb-6">Your ultimate destination for knowledge, growth, and innovation.</p>
      <div style={{ width: "100%" }}>
        <div style={{ height: 0, paddingBottom: "56.25%", position: "relative", width: "100%" }}>
          <iframe
            allowFullScreen
            frameBorder="0"
            height="100%"
            src="https://giphy.com/embed/CHJAZ8hZUsH3yyBw4q/video"
            style={{ left: 0, position: "absolute", top: 0 }}
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
