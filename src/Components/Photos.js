import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { loadPosts, spotLight, deletePhoto } from '../Action/action'
import PhotoCard from './PhotoCard'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'reactstrap'



const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-direction:row
`

const StyledCard = styled.div`
  width: 800px;
  margin:20px;
`
const Photos = ({ images, loadPosts, isLoading, spotLight, deletePhoto, album }) => {

  const param = useParams().id
  console.log(param)

  function remove(e) {
    alert("Are you sure want to delete this post")
    console.log('Delete id ---> ', e.target.id)
    deletePhoto(e.target.id)
  }

  useEffect(() => {
    // const id = localStorage.getItem('id')
    loadPosts(param)
  }, [])

  console.log('COMPONENT -> Photos -> images', images)
  console.log('COMPONENT -> Photos -> isLoading', isLoading)
  const spotLightPhoto = id => {
    spotLight(id)
  }

  return (
    <div>

      {!isLoading ?
        <StyledCardContainer>
          {images.map((image) => (
            <StyledCard id={image.id} onClick={() => spotLightPhoto(image.id)} >
              <Link to={`/photo/${image.id}`}>
                <PhotoCard image={image} key={image.id} height="900px" />
              </Link>
              <Link to={`/${image.story_id}/edit/${image.id}`}>
                <Button style={{ marginLeft: "25%" }}>Edit</Button>
              </Link>
              <Button style={{ marginLeft: "10%" }} id={image.id} onClick={remove}>Delete</Button>

            </StyledCard>
          ))}
        </StyledCardContainer>
        : <h1>LOADING</h1>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    images: state.data || [],
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, { loadPosts, spotLight, deletePhoto })(Photos)
