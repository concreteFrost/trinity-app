import { useSelector } from "react-redux";
import s from "./Breakdown.module.scss";
import { BreakdownList } from "./BreakdownList/BreakdownList";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Breakdown = () => {
  const analytics = useSelector((state) => state.pubManagerAnalyticsReducer);
  const generatePDF = async () => {
    const input = document.getElementById('component-to-export');
    const pixelRatio = window.devicePixelRatio || 1; // Get the device's pixel ratio
    const canvas = await html2canvas(input, { scale: pixelRatio });
    const imgData = canvas.toDataURL('image/pdf');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PDF', 0, 0, 200, 100);
    pdf.save('example.pdf');
  };
  return (
    <div className={s.container} id="component-to-export">
      <h2>BREAKDOWN</h2>
      <div className={s.breakdown_lists} >
        <BreakdownList payments={analytics.doorstaff} title={"Doorstaff"} ></BreakdownList>
        <BreakdownList payments={analytics.costs} title={"Costs"}></BreakdownList>
     </div>
    </div>
  );
};
