import "./App.css";
import Row from './Row'
import requests from './requests'
import Banner from './Banner'
import Navbar from './Navbar'
function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <Navbar/>
      {/* Banner */}
      <Banner/>
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorroMovies}/>
      <Row title="Documentaries" fetchUrl={requests.fetchDodumentaries}/>
    </div>
  );
}

export default App;
