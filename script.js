document.getElementById("calculate-btn").addEventListener("click", function () {
    // Get user inputs
    const salaryAmount = parseFloat(document.getElementById("salary-amount").value);
    const salaryType = document.getElementById("salary-type").value;
    const hoursPerWeek = parseFloat(document.getElementById("hours-per-week").value);
    const daysPerWeek = parseFloat(document.getElementById("days-per-week").value);
    const holidaysPerYear = parseFloat(document.getElementById("holidays-per-year").value) || 0;
    const vacationDaysPerYear = parseFloat(document.getElementById("vacation-days-per-year").value) || 0;

    // Validate inputs
    if (
        isNaN(salaryAmount) ||
        isNaN(hoursPerWeek) ||
        isNaN(daysPerWeek) ||
        hoursPerWeek <= 0 ||
        daysPerWeek <= 0
    ) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    // Calculate total working days in a year
    const totalDaysInYear = 365;
    const totalWorkingDays = totalDaysInYear - (holidaysPerYear + vacationDaysPerYear);
    const workingWeeksInYear = totalWorkingDays / 7;

    // Variables to store calculated rates
    let hourlyRate = 0;
    let dailyRate = 0;
    let weeklyRate = 0;
    let monthlyRate = 0;
    let annualRate = 0;

    // Calculate rates based on salary type
    if (salaryType === "hour") {
        hourlyRate = salaryAmount;
        dailyRate = hourlyRate * (hoursPerWeek / daysPerWeek);
        weeklyRate = dailyRate * daysPerWeek;
        monthlyRate = (weeklyRate * workingWeeksInYear) / 12;
        annualRate = weeklyRate * workingWeeksInYear;
    } else if (salaryType === "day") {
        dailyRate = salaryAmount;
        hourlyRate = dailyRate / (hoursPerWeek / daysPerWeek);
        weeklyRate = dailyRate * daysPerWeek;
        monthlyRate = (weeklyRate * workingWeeksInYear) / 12;
        annualRate = weeklyRate * workingWeeksInYear;
    } else if (salaryType === "week") {
        weeklyRate = salaryAmount;
        dailyRate = weeklyRate / daysPerWeek;
        hourlyRate = dailyRate / (hoursPerWeek / daysPerWeek);
        monthlyRate = (weeklyRate * workingWeeksInYear) / 12;
        annualRate = weeklyRate * workingWeeksInYear;
    } else if (salaryType === "month") {
        monthlyRate = salaryAmount;
        annualRate = monthlyRate * 12; // Corrected annual calculation
        weeklyRate = annualRate / workingWeeksInYear; // Derive weekly from annual
        dailyRate = weeklyRate / daysPerWeek; // Derive daily from weekly
        hourlyRate = dailyRate / (hoursPerWeek / daysPerWeek); // Derive hourly from daily
    }

    // Calculate adjusted earnings (accounting for holidays/vacation)
    const adjustmentFactor = totalWorkingDays / totalDaysInYear;
    const adjustedHourly = hourlyRate; // Hourly rate remains the same
    const adjustedDaily = dailyRate * adjustmentFactor;
    const adjustedWeekly = weeklyRate * adjustmentFactor;
    const adjustedMonthly = monthlyRate * adjustmentFactor;
    const adjustedAnnual = annualRate * adjustmentFactor;

    // Update the results in the table
    document.getElementById("hourly-unadjusted").textContent = `$${hourlyRate.toFixed(2)}`;
    document.getElementById("hourly-adjusted").textContent = `$${adjustedHourly.toFixed(2)}`;
    document.getElementById("daily-unadjusted").textContent = `$${dailyRate.toFixed(2)}`;
    document.getElementById("daily-adjusted").textContent = `$${adjustedDaily.toFixed(2)}`;
    document.getElementById("weekly-unadjusted").textContent = `$${weeklyRate.toFixed(2)}`;
    document.getElementById("weekly-adjusted").textContent = `$${adjustedWeekly.toFixed(2)}`;
    document.getElementById("monthly-unadjusted").textContent = `$${monthlyRate.toFixed(2)}`;
    document.getElementById("monthly-adjusted").textContent = `$${adjustedMonthly.toFixed(2)}`;
    document.getElementById("annual-unadjusted").textContent = `$${annualRate.toFixed(2)}`;
    document.getElementById("annual-adjusted").textContent = `$${adjustedAnnual.toFixed(2)}`;
});

// Clear button functionality
document.getElementById("clear-btn").addEventListener("click", function () {
    // Clear only the result output values
    document.querySelectorAll(".result-value").forEach((cell) => (cell.textContent = ""));

    // Clear input fields
    document.getElementById("salary-amount").value = "";
    document.getElementById("hours-per-week").value = "";
    document.getElementById("days-per-week").value = "";
    document.getElementById("holidays-per-year").value = "";
    document.getElementById("vacation-days-per-year").value = "";
});