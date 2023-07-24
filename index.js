import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

// Path to the JSON file that stores the commit date
const path = "./data.json";

// Function to create a commit on a specific date
const markCommit = (date) => {
  const data = { date: date };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

// Function to create multiple commits with around 70% density
const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // Generate random dates from April 1, 2023, to today
  const startDate = moment("2023-04-01");
  const endDate = moment();
  const daysBetween = endDate.diff(startDate, "days");

  // 70% density: Commit only on 70% of the days
  if (random.float() < 0.7) {
    const randomDay = random.int(0, daysBetween);
    const date = startDate.clone().add(randomDay, "days").format();

    console.log(date);
    markCommit(date);
  }

  makeCommits(--n);
};

// Make around 300 commits to create a 70% density pattern
makeCommits(300);
