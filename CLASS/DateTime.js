let myDate = new Date();
console.log(myDate);
console.log("Current Date and Time: ", myDate.toString()); //
console.log("Date in ISO Format: ", myDate.toISOString()); //
console.log("Date in Locale Format: ", myDate.toLocaleString());
console.log("Extracted Year: ", myDate.toDateString()); //
console.log(typeof(myDate));
console.log(myDate.getDate);
console.log(myDate.getDay()); //
console.log(myDate.getFullYear());
console.log(myDate.getHours());
console.log(myDate.getMinutes());
console.log(myDate.getSeconds());
console.log(myDate.getUTCDate());

let mytimestamp = Date.now();
console.log("Current Timestamp: ", mytimestamp);
console.log(Date.now());
console.log(Date.now()/1000)


