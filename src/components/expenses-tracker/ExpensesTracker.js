import React, { useState } from "react"
import "./ExpnensesTracker.css"
export const ExpensesTracker = () => {
	const initialState = {
		id: "",
		name: "",
		amount: "",
		catagory: "",
	}
	
    const [count, setCount] = useState(0);
	const [expense, setExpense] = useState(initialState);
	const [expenseList, setExpenseList] = useState([]);
	const [expensePercentage, setExpensePercentage] = useState({"food": "25%", "travel": "25%", "shopping": "25%", "other": "25%"});

	const onAddExpenseButtonClick = () => {
		if(expense.name === "")
		{
			alert("Expense Name required");
			return;
		}
		if(expense.amount === "" || expense.amount <= 0 || expense.amount === NaN)
		{
			alert("Expense Amount required and should be greater than 0");
			return;
		}
		if(expense.catagory === "")
		{
			alert("Please Choose Expense Type");
			return;
		}
        expense.id = count + 1;
		var updatedExpenseList = [...expenseList, expense];

		setCount(count + 1);
    
		setExpenseList(updatedExpenseList);
		let totalexpense = 0;
		var totalfoodexpense = 0;
		var totaltravelexpense = 0;
		var totalshoppingexpense = 0;
		var totalotherexpense = 0;
		updatedExpenseList.forEach((exp) => { totalexpense +=  parseInt(exp.amount) })
		updatedExpenseList.filter((exp) => exp.catagory == "Food").forEach((a) => totalfoodexpense += parseInt(a.amount));
		updatedExpenseList.filter((exp) => exp.catagory == "Travel").forEach((a) => totaltravelexpense += parseInt(a.amount));
		updatedExpenseList.filter((exp) => exp.catagory == "Shopping").forEach((a) => totalshoppingexpense += parseInt(a.amount));
		updatedExpenseList.filter((exp) => exp.catagory == "Other").forEach((a) => totalotherexpense += parseInt(a.amount));

		setExpensePercentage({"food": Math.round((totalfoodexpense/totalexpense)*100) + "%", 
		"travel": Math.round((totaltravelexpense/totalexpense)*100) + "%", 
		"shopping": Math.round((totalshoppingexpense/totalexpense)*100) + "%", 
		"other": Math.floor((totalotherexpense/totalexpense)*100)+ "%"})
		setExpense(initialState);
	}
	

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div>
				<form>
					<section
						className="my-30 layout-row align-items-center justify-content-center"
						style={{ width: "1000px" }}
					>
						<input
							type="text"
							placeholder="New Expense"
							value={expense.name}
							onChange ={((e) => setExpense({...expense, "name": e.target.value}))}
							style={{ width: "40%", marginRight: "10px" }}
							name="name"
							data-testid="expense-name"
						/>
						<input
							type="number"
							value={expense.amount}
							onChange ={((e) => setExpense({...expense, "amount": e.target.value}))}
							placeholder="Enter Amount"
							style={{ width: "40%" }}
							name="amount"
							data-testid="expense-amount"
						/>
						<select className="ml-2" name="catagory" data-testid="expense-type"
							value={expense.catagory}
							onChange={((e) => setExpense({...expense,  "catagory": e.target.value }))}>
							<option value={""}>Select Type</option>
							<option data-testid="expense-type-1" value={'Food'}>Food</option>
							<option data-testid="expense-type-2" value={'Travel'}>Travel</option>
							<option data-testid="expense-type-3" value={'Shopping'}>Shopping</option>
							<option data-testid="expense-type-4" value={'Other'}>Other</option>
						</select>
						<button
							type="button"
							style={{ width: "20%" }}
							data-testid="expense-submit-button"
							onClick={onAddExpenseButtonClick}
						>
							Add Expense
						</button>
					</section>
				</form>
			</div>
			<div className="flex" style={{ width: '100%' }}>
				<div style={{ width: '48%' }} className="mx-5 m-10 card">
					<p className="title">Expense List</p>
					<table >
						<thead>
							<tr>
								<td>Sr No</td>
								<td>Expense</td>
								<td>Amount</td>
								<td>Catagory</td>
							</tr>
						</thead>
						<tbody>
							{
								expenseList && expenseList.map(exp => {
									return (
										<tr key={exp.id} data-testId={"expense-list-"+ (exp.id-1)}>
											<td>{exp.id}</td>
											<td>{exp.name}</td>
											<td>{exp.amount}</td>
											<td>{exp.catagory}</td>
										</tr>
									)
								})
							}							
					</tbody>
				</table>
			</div>
			<div className="card ml-5 m-10" style={{ width: '50%' }}>
				<p className="title">Expenses Breakdown</p>
				<br />
				<div style={{ height: '30px', display: 'flex' }}>
					<div data-testid="expense-distribution-food" style={{ width: expensePercentage.food  }} className="lightblue"></div>
					<div data-testid="expense-distribution-travel" style={{ width: expensePercentage.travel}} className="red"></div>
					<div data-testid="expense-distribution-shopping" style={{ width:  expensePercentage.shopping }} className="lightgreen"></div>
					<div data-testid="expense-distribution-other" style={{ width: expensePercentage.other}} className="orange"></div>
				</div>
				<br />
				<div className="flex ml-10 mb-2">
					<div className="lightblue hight-20 width-20"></div> &nbsp; Food
				</div>
				<div className="flex ml-10 mb-2">
					<div className="red hight-20 width-20"></div> &nbsp; Travel
				</div>
				<div className="flex ml-10 mb-2">
					<div className="lightgreen hight-20 width-20" ></div> &nbsp; Shopping
				</div>
				<div className="flex ml-10 mb-10">
					<div className="orange hight-20 width-20"></div> &nbsp; Other
				</div>
			</div>
			</div>
		</div >
	)
}
