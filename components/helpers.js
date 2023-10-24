export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}${month}${year}`;
  }

  export function prioritySorting(priority, sortby) {
    if (sortby === "highToLow") {
      switch (priority) {
        case "High":
          return 3;
        case "Medium":
          return 2;
        case "Low":
          return 1;
        case "None":
          return 0;
        default:
          return 0;
      }
    } else if (sortby === "lowToHigh") {
      switch (priority) {
        case "High":
          return 0;
        case "Medium":
          return 1;
        case "Low":
          return 2;
        case "None":
          return 3;
        default:
          return 0;
      }
    }
  }