let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;

function guess() {
    let input = document.getElementById('user-guess');
    if (answer == '' && attempt == '') {
      setHiddenFields();
    }

    if (validateInput(input.value)) {
      attempt++;
      document.getElementById('attempt').value = attempt;
    } else {
      return false;
    }

    if (getResults(input.value)) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (attempt >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() {
  answer = (Math.floor(Math.random() * 10000)).toString();
  while (answer.length < 4) {
    answer = "0" + answer;
  }
  document.getElementById('answer').value = answer;
  attempt = 0;
}

function setMessage(message) {
  document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
  if (input.length != 4) {
    setMessage("Guesses must be exactly 4 characters long.")
    return false;
  }
  return true;
}

function getResults(input) {
  results = document.getElementById('results');
  let original = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  let correctGuesses = 0;
  let positions = answer.toString().split("");
  for(i=0; i < input.length; i++) {
    if (input[i] == positions[i]) {
      correctGuesses++;
      original += '<span class="glyphicon glyphicon-ok"></span>';
    } else if (positions.includes(input[i])) {
      original += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      original += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  results.innerHTML = results.innerHTML + original + '</div></div>';
  return(correctGuesses == input.length);
}

function showAnswer(result) {
  let code = document.getElementById('code');
  code.innerHTML = document.getElementById('answer').value;
  if (result) {
    code.className += " success";
  } else {
    code.className += " failure";
  }
}

function showReplay() {
  document.getElementById('guessing-div').style = "display:none";
  document.getElementById('replay-div').style = "display:block";
}
