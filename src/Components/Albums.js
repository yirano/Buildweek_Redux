import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { loadAlbums, removeAlbum } from '../Action/action'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import AlbumCard from './AlbumCard'

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
const StyledAlbum = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;
  min-width: 500px;
  padding: 20px 0;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const styleButton = {
  height: '40px',
  padding: '2px 10px'
}
const Albums = (props) => {
  const dispatch = useDispatch()

  const remove = (e) => {
    props.removeAlbum(e.target.id)
    alert("Are you sure want to delete this album?")
  }
  useEffect(() => {
    const id = localStorage.getItem('id')
    props.loadAlbums(id)
  }, [])
  console.log('Rendered albums --> ', props.albums)


  return (
    <StyledCardContainer>
      {props.albums !== undefined ? props.albums.map((album) => (
        <StyledAlbum>
          <Link to={`/albums/${album.id}`}>
            <AlbumCard album={album} />
          </Link>
          <StyledButtonContainer>
            <Link to={`/album/${album.id}/post`}>
              <Button style={styleButton} id={album.id} onClick={() => dispatch({ type: 'EDIT_ALBUM', payload: false })}>Add to Album</Button>
            </Link>
            <Link to={`/album/edit/${album.id}`}>
              <Button style={styleButton} id={album.id} onClick={() => dispatch({ type: 'EDIT_ALBUM', payload: true })}>Edit Album</Button>
            </Link>
            <Button style={styleButton} id={album.id} onClick={e => remove(e)}>Delete</Button>
          </StyledButtonContainer>
        </StyledAlbum>
      )) : null}
    </StyledCardContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    albums: state.albumData || []
  }
}

export default connect(mapStateToProps, { loadAlbums, removeAlbum })(Albums)