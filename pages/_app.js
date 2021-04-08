import '../styles/globals.css'
import "react-mde/lib/styles/css/react-mde-all.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App
