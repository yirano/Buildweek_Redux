import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap'
import styled from 'styled-components'


const StyledImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`

const PhotoCard = ({ image, height, width, style }) => {

  function scale(e) {
    e.target.style.transform = 'scale(1.1)'
  }
  function scale2(e) {
    e.target.style.transform = 'scale(1.0)'
  }

  return (
    <Card style={{ width: "100%" }}>
      <StyledImageContainer style={{ height: height }}>
        <CardImg src={image.photo_url} alt="" style={{ minHeight: '100%' }} onMouseOver={scale} onMouseLeave={scale2} />
      </StyledImageContainer>

      <CardBody>
        <CardTitle>Title: {image.photo_title}</CardTitle>
        <CardText>Description: {image.photo_description}</CardText>
      </CardBody>
    </Card>
  )
}

export default PhotoCard
