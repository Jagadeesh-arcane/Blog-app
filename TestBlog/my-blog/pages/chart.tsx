// pages/chart.tsx

const FlourishChartPage = () => {
    return (
      <div className="max-w-7xl mx-auto py-12 px-6" >
        <h2 className="text-center text-4xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Blog Data Visualization
        </h2>
        <div className="w-full">
          <iframe
            src="https://flo.uri.sh/visualisation/YOUR_KEY/embed"  // your Flourish chart key
            frameBorder="0"
            scrolling="no"
            className="w-[1000px] h-[500px] max-w-full block"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default FlourishChartPage;
  