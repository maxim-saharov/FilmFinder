//
import React, {FC} from 'react'
import {IFilm} from '../services/PostService'
import PhotoComingSoon from '../img/PhotoComingSoon.jpg'
import {Card} from 'antd'

const {Meta} = Card


interface PostItemProps {
   post: IFilm;
}

const PostItemFilm: FC<PostItemProps> = ({post}) => {

   const poster = post.Poster === 'N/A' ? PhotoComingSoon : post.Poster

   return (
      <div className='post'>

         <a
            href={`https://www.imdb.com/title/${post.imdbID}`}
            target='_blank' rel='noopener noreferrer'
         >
            <Card
               hoverable
               style={{width: 240}}
               cover={
                  <img alt={post.Title} src={poster}
                  />}
            >
               <Meta title={post.Title} description={post.Year} />
            </Card>
         </a>
      </div>


   )
}

export default PostItemFilm



