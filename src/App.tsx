import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import { dataArray, DataUnit } from "./data"

function App() {
  const [checkArray, setCheckArray] = useState<DataUnit[]>(dataArray);
  const [lastIndex, setLastIndex] = useState(-1);
  const [allIsCheck, setAllIsCheck] = useState(false);

  const toggleAll = (e: any) => {
    const index = e.target.id === "all" ? "all" : e.target.id.split("-")[1]
    if (index === "all") {
      setAllIsCheck(!allIsCheck);
      const tempAr = [...checkArray];
      tempAr.forEach(element => {
        element.isChecked = e.target.checked;
      });
      setCheckArray(pre => tempAr);
    } else {
      const tempAr = [...checkArray];
      tempAr[index].isChecked = !tempAr[index].isChecked;
      setCheckArray(pre => tempAr);
      setLastIndex(index);
      if (e.nativeEvent.shiftKey && lastIndex !== -1) {
        for (let ii = lastIndex; ii < index; ii++) {
          const dataUnit = tempAr[ii];
          dataUnit.isChecked = true;
        }
      }
    }
  };

  useEffect(() => {
    if (!checkArray.find(item => !item.isChecked)) {
      setAllIsCheck(true);
    } else {
      setAllIsCheck(false);
    }
  }, [checkArray])

  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td><Checkbox id={`Checkbox-all`} onClick={toggleAll} checked={allIsCheck}></Checkbox></td>
            <td>狀態</td>
          </tr>
        </tbody>
        {
          checkArray.map((element, index) =>
            <tr key={`tr-${index}`}>
              {element.enable ? <th><Checkbox id={`Checkbox-${index}`} onClick={toggleAll} checked={element.isChecked}></Checkbox></th> : <th className=''></th>}
              <th>{element.value}</th>
            </tr>)
        }
      </table>
    </div >
  );
}



export default App;
