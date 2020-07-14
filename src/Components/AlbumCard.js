import React, { useEffect, useState } from 'react'
import { loadPosts } from '../Action/action'
import { Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'


const StyledImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`
const AlbumCard = ({ width, height, album, loadPosts, stuff }) => {
  const [coverImg, setCoverImg] = useState(require('../Images/no_image.jpg'))

  useEffect(() => {
    axiosWithAuth().get(`stories/${album.id}/photos`)
      .then(res => {
        setCoverImg(res.data[0].photo_url)
      })
  }, [])


  return (
    <Card style={{ display: 'flex' }}>
      {/* <StyledImageContainer style={{ height: height, width: width }}>
        <CardImg src={album.photo_url} alt="" style={{ minHeight: '100%' }} />
      </StyledImageContainer> */}
      <StyledImageContainer style={{ height: '500px', width: '100%' }}>
        <CardImg src={coverImg} style={{ minHeight: '100%' }} />
      </StyledImageContainer>
      <CardBody>
        <CardTitle>Title: {album.story_name}</CardTitle>
        <CardText>Description: {album.story_description}</CardText>
      </CardBody>
    </Card>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    stuff: state.data
  }
}

export default connect(mapStateToProps, { loadPosts })(AlbumCard)
