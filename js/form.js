db.collection('favos').get().then(snapshot => {
    // console.log(snapshot.docs);
    setupTopMovies(snapshot.docs);
});

const movieTopList = document.getElementById('topMovies');

const setupTopMovies = (data) => {
    let html = '';
    data.forEach(doc => {
        const top = doc.data();
        const li = `
        <li>
            <div class="movieTitle">${top.title}</div>
            <div class="movieRelease">${top.release}</div>
        </li>
        `;
        html += li
    });
    movieTopList.innerHTML = html;
}

auth.onAuthStateChanged(user => {
    // 
    if(user){
        console.log('user logged in: ', user);
    }else{
        console.log('user logged out');
    }
})

function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
    
    document.getElementById('signUp').reset();
    document.getElementById('signupContainer').style.display='none';
}

function signIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));

    document.getElementById('signIn').reset();
    document.getElementById('signinContainer').style.display='none';
}

function signOut() {
    auth.signOut().then(() => {
        alert('Signed out')
    })
}