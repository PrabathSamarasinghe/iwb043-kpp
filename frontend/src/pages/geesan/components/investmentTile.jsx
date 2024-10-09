import thumb from "./assets/thumb.jpg";

function ITile({ InvestID,BankName,InvestedDate,Amount }){
    //Assuming an investment has these properties: InvestID, BankName ,InvestedDate, Amount
    return(
        <div className="card card-compact bg-base-100 w-64 rounded-lg shadow-xl shadow-gray-700 hover:scale-105 transition-transform duration-300 m-4">
        <figure>
            <img
            src= {thumb}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">ID: {InvestID}</h2>
            <p>This is your investment of {Amount} in {BankName}</p>
            <p className="text-sm italic">made on {InvestedDate}</p>
            <div className="card-actions justify-end">
            <button className="btn rounded-full bg-primary hover:bg-accent dark:text-white">Info</button>
            </div>
        </div>
        </div>
    )
}
export default ITile;