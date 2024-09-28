import { Button } from "./button";

export default function Navbar() {
  return (
    <div className="min-h-screen flex flex-col w-full fixed z-10">
      <header className="bg-blue-950 text-white">
        <div className="mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl font-bold">GovTaxAssist</h1>
            </div>
            <Button
              variant="outline"
              className="bg-white text-blue-950 hover:bg-blue-100"
            >
              Login
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
