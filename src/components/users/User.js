import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {

    useEffect(()=>{
        getUser(match.params.login);
        getUserRepos(match.params.login);
    },[]);

    const {
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;
    
    if(loading) return <Spinner/>;

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                <i className='fa fa-arrow-left'></i> Back to Search
            </Link>
            <br/><br/><br/>
            <div className='card gtid-2'>
                <div className='all-center'>
                    <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />
                    <h1>{login}</h1>
                    <p>{location}</p>
                    <p>Hireable: {' '} {hireable ? <i className="fas fa-check text-success"></i>:<i className="fas fa-times-circle text-danger"></i>}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1' target={'_blank'}>Github Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company: </strong> {company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>Website: </strong> {blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-light'>Followers: { followers }</div>
                <div className='badge badge-success'>Following: { following }</div>
                <div className='badge badge-warning'>Public Repos: { public_repos }</div>
                <div className='badge badge-dark'>Public Gists: { public_gists }</div>
            </div>
            <Repos repos={repos}/>
        </Fragment>
    );
        
}

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
}

export default User;