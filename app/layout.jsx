// import the styles
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
// create the meta data
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      {/* have a main div */}
      <body>
        {/* always wrap the provider here inside the body */}
        <Provider>
          <div className="main">
            {/* add the background color with a self closing div */}
            <div className="gradient" />
          </div>
          <main className="app">
            {/* Add the navigation here to caught across all page */}
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
