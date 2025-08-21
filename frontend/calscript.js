function workDays(y, m) {
    let daysInMonth = new Date(y, m + 1, 0).getDate();
    let allDays = [];
  
    for (let i = 1; i <= daysInMonth; i++) {
      let date = new Date(y, m, i);
      let dayName = date.toLocaleString("en-US", { weekday: "long" });
  
      if (dayName !== "Saturday" && dayName !== "Sunday") {
        allDays.push(date);
      }
    }
    return allDays;
  }

  document.getElementById("attendanceForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    let n = Name.value.trim();
    let y = parseInt(year.value);
    let m = parseInt(month.value) - 1;
    let a = parseInt(attended.value);
  
    if (!n || a < 0) {
      result.innerText = "Enter details!";
      return;
    }
  
    let totalDays = workDays(y, m).length;
    let percentage = ((a / totalDays) * 100).toFixed(2);
  
    result.innerText = `Total Classes: ${totalDays} | Attendance: ${percentage}%`;
    records.innerHTML += `<tr><td>${n}</td><td>${m + 1}-${y}</td><td>${percentage}%</td></tr>`;
  
    Name.value = "";
    attended.value = "";
  });
  document.getElementById("workingDaysForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    let y = parseInt(year.value);
    let m = parseInt(month.value) - 1;
  
    let daysList = workDays(y, m)
      .map(function (d) {
        return `<tr><td>${d.getDate()}-${m + 1}-${y}</td><td>${d.toLocaleString("en-US", { weekday: "long" })}</td></tr>`;
      })
      .join("");
  
    days.innerHTML = "<tr><th>Date</th><th>Day</th></tr>" + daysList;
  });
  