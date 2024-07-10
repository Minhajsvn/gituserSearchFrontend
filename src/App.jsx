import { useState } from 'react'
import './App.css'
import axios from 'axios';
import RepoDetails from './components/RepoDetails';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [selectedRepo, setSelectRepo] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  }

  const handleSearch = async () => {
    if(username){
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log(response)

        if(response){
          setUserData(response.data);
          console.log(userData)
          const repoData = await axios.get(response.data.repos_url);
            // console.log(repoData.data)
          if(repoData){
            setReposData(repoData.data);
          }else{
            console.error('Repositories not found');
          }


        }else{
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const handleRepoClick = (repo) => {
    setSelectRepo(repo);
  };

  const handleBack = () => {
    setSelectRepo(null);
  }

  if(selectedRepo){
    return <RepoDetails repo={selectedRepo} onBack={handleBack} />
  }

  return (
    <>
      <div style={styles.container} >
        <h1 style={styles.header} >Github User Search</h1>
        <div>
        <input 
          type="text" 
          value={username} 
          onChange={handleInputChange} 
          placeholder='Enter Github username' 
          style={styles.input} 
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>
        {userData && (
          <div style={styles.userData}>
            <img src={userData.avatar_url} alt="avatar" style={styles.avatar}/>
            <p><strong>Name: </strong>{userData.name}</p>
            <p><strong>Bio: </strong>{userData.bio}</p>
            <p><strong>Location: </strong>{userData.location}</p>
            <p><strong>Public Repositories: </strong>{userData.public_repos}</p>
          </div>
        )}
        {reposData.length > 0 && (
          <div style={styles.reposContainer} >
            <h2 style={styles.reposHeader}>Repositories</h2>
            <ul style={styles.reposList}>
              {reposData.map(repo => (
                <li key={repo.id} style={styles.repoItem} >
                  <img src={repo.owner.avatar_url} alt="avatar" style={styles.avatar} />
                  <div style={styles.repoText}>
                  <button onClick={() => handleRepoClick(repo)} style={styles.repoLink}>
                  {repo.name}
                  </button>
                  <p>{repo.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    height: '100vh',
    backgroundColor: 'f5f5f5',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px', 
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  userData: {
    marginTop: '20px',
    textAlign: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  reposContainer: {
    marginTop: '20px',
    width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  reposHeader: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  reposList: {
    listStyleType: 'none',
    padding: '0',
  },
  repoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  repoText: {
    marginLeft: '20px',
  },
  repoLink: {
    fontSize: '15px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#0366d6',
  },
}

export default App
