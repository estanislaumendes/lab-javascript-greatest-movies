// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray == []) {
    return 0;
  } else {
    const filteredMovies = moviesArray.filter(movie => {
      return (
        movie.genre.includes('Drama') && movie.director === 'Steven Spielberg'
      );
    });

    // Return the number of filtered movies
    return filteredMovies.length;
  }
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  } else {
    const totalScore = moviesArray.reduce((accumulator, movie) => {
      // Ensure that the 'score' property exists in each movie object
      if (movie.score) {
        return accumulator + movie.score;
      } else {
        return accumulator;
      }
    }, 0);

    const averageScore = totalScore / moviesArray.length;

    const roundedAverage = parseFloat(averageScore.toFixed(2));

    return roundedAverage;
  }
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMoviesArray = moviesArray.filter(movie => {
    return movie.genre.includes('Drama');
  });

  if (dramaMoviesArray.length === 0) {
    return 0;
  } else if (dramaMoviesArray.length === 1) {
    return dramaMoviesArray[0].score;
  } else {
    const totalScore = dramaMoviesArray.reduce((accumulator, movie) => {
      if (movie.score) {
        return accumulator + movie.score;
      } else {
        return accumulator;
      }
    }, 0);

    const averageScore = totalScore / dramaMoviesArray.length;

    const roundedAverage = parseFloat(averageScore.toFixed(2));

    return roundedAverage;
  }
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const newArray = [...moviesArray];

  return newArray.sort((a, b) => {
    // First, compare by 'year'
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    // If 'year' is the same, compare by 'title' alphabetically
    return a.title.localeCompare(b.title);
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const titles = moviesArray.map(movie => movie.title || '');

  // Sort titles alphabetically
  const sortedTitles = titles.sort();

  // Return the first 20 titles or all titles if there are less than 20
  return sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  // Create a deep copy of the input array to avoid modifying the original data
  const moviesCopy = JSON.parse(JSON.stringify(moviesArray));

  // Iterate through each movie and convert the duration to minutes
  for (let i = 0; i < moviesCopy.length; i++) {
    const duration = moviesCopy[i].duration;
    const [hours, minutes] = duration.split('h ').map(time => parseInt(time));

    // Convert hours and minutes to minutes and update the duration property
    const totalMinutes = hours * 60 + (minutes || 0);
    moviesCopy[i].duration = totalMinutes;
  }

  return moviesCopy;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  // Check if the array is empty
  if (moviesArray.length === 0) {
    return null;
  } else if (moviesArray.length === 1) {
    return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`;
  }

  const yearStats = {};

  // Iterate through the moviesArray
  moviesArray.forEach(movie => {
    const year = movie.year;
    const score = movie.score;

    // If the year is not in the yearStats object, initialize it
    if (!yearStats[year]) {
      yearStats[year] = {
        totalScore: 0,
        movieCount: 0,
      };
    }

    // Add the score to the total score for the year and increment the movie count
    yearStats[year].totalScore += score;
    yearStats[year].movieCount++;
  });

  // Find the year with the highest average score
  let bestYear = 0;
  let bestAvgScore = 0;

  for (const year in yearStats) {
    const avgScore = yearStats[year].totalScore / yearStats[year].movieCount;

    if (avgScore > bestAvgScore) {
      bestYear = year;
      bestAvgScore = avgScore;
    }
  }

  return `The best year was ${bestYear} with an average score of ${bestAvgScore}`;
}
