const likeBtn = document.querySelector("#likeBtn");
const dislikeBtn = document.querySelector("#dislikeBtn");

const initLike = 152;
const initDislike = 31;

let counter = { likes: initLike, dislikes: initDislike };

likeBtn.innerText = counter.likes;
dislikeBtn.innerText = counter.dislikes;

function handleLike() {
  const isClicked = likeBtn.classList.contains("btn-green");
  if (isClicked) {
    removeCookie("vote")
    decreaseElement(likeBtn, counter, "likes", "btn-green")
  } else {
    removeConflict("dislike");
    setCookie("vote", "like")
    increaseElement(likeBtn, counter, "likes", "btn-green")
  }
}

function handleDislike() {
  const isClicked = dislikeBtn.classList.contains("btn-red");
  if (isClicked) {
    removeCookie("vote")
    decreaseElement(dislikeBtn, counter, "dislikes", "btn-red");
  } else {
    removeConflict("like");
    setCookie("vote", "dislike")
    increaseElement(dislikeBtn, counter, "dislikes", "btn-red");
  }
}

function removeConflict(conflictWith) {
  const cookieValue = getCookieValue("vote");

  if (cookieValue == conflictWith && cookieValue == "like") {
    decreaseElement(likeBtn, counter, "likes", "btn-green")
  } else if (cookieValue == conflictWith && cookieValue == "dislike") {
    decreaseElement(dislikeBtn, counter, "dislikes", "btn-red")
  }
}

function removeCookie(key) {
  document.cookie = `${key}=;Max-age=0;`
}

function setCookie(key, value) {
  document.cookie = `${key} = ${value}`;
}

function getCookieValue(key) {
  let cookiesArray = document.cookie.split("=");
  let keyIndex = cookiesArray.indexOf(key);
  if (keyIndex == -1) {
    return undefined;
  }
  let valueIndex = keyIndex + 1;
  return cookiesArray[valueIndex];
}

function increaseElement(element, counterObject, counterItem, colorClass) {
  counterObject[counterItem]++;
  element.innerText = counterObject[counterItem];
  element.classList.add(colorClass);
}

function decreaseElement(element, counterObject, counterItem, colorClass) {
  counterObject[counterItem]--;
  element.innerText = counterObject[counterItem];
  element.classList.remove(colorClass)
}

window.onload = function() {
  const value = getCookieValue("vote");
  if (value == "like") {
    likeBtn.classList.add("btn-green")
  } else if (value == "dislike") {
    dislikeBtn.classList.add("btn-red")
  }

}
