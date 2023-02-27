import React,{useState} from "react"
import * as XLSX from 'xlsx'
import './App.css';
import Create_cards from "./create_cards";

// function App() {
//   return (
//     <>
    
//     </>
//   );
// }


function App() {

  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);
 
  // submit
  const [excelData, setExcelData]=useState(null);
  
  // it will contain array of objects

  // handle File
  const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const formattedData = data.map((row) => {
        const dateNum = row.Date_Of_Invoice;
        const dateStr = XLSX.SSF.format('dd-mm-yyyy', dateNum);
        return { ...row, Date_Of_Invoice: dateStr };
      });
      setExcelData(formattedData);
    } else {
      setExcelData(null);
    }
  }


return (
  <>
  <div className="container">

{/* upload file section */}
<div className='form'>
<form className='form-group' autoComplete="off"
// ()=> handleSubmit()
onSubmit={handleSubmit}>
  <label><h5>Upload Excel file</h5></label>
  <br></br>
  <input type='file' className='form-control'
  // ()=> handleFile()
  onChange={handleFile} required></input>                  
  {excelFileError&&<div className='text-danger'
  style={{marginTop:5+'px'}}>{excelFileError}</div>}
  <button type='submit' className='btn btn-success'
  style={{marginTop:5+'px'}}>Submit</button>
</form>
</div>

<br></br>
<hr></hr>
{excelData == null&&setExcelData([])}
{console.log(excelData)}
{excelData!= null && excelData.length !== 0 && console.log(excelData[0].Date_Of_Invoice)}
{excelData!= null && excelData.length !== 0 && <Create_cards excelData= {excelData}/>}

</div>
  </>
);
}

export default App;

/*
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */