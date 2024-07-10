/* eslint-disable react/prop-types */


export default function RepoDetails({ repo, onBack}) {
  return (
    <div style={styles.container}>
      <button onClick={onBack}>Back</button>
      <h2 style={styles.header}>{repo.name}</h2>
      <p><strong>Description: </strong>{repo.description}</p>
      <p><strong>Language: </strong>{repo.language}</p>
      <p><strong>Stars: </strong>{repo.stargazers_count}</p>
      <p><strong>Forks: </strong>{repo.forks_count}</p>
      <p><strong>Open Issues: </strong>{repo.open_issues_count}</p>
      <p><strong>Watchers: </strong>{repo.watchers_count}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={styles.link}>View on GitHub</a>
    </div>
  )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    link: {
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#0366d6'
    },
};
