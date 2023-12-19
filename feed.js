import { inject, createApp, toRef } from 'vue'
import Profile from './profile.js'
import Likes from './likes.js'
export default {
    setup(){
        
       const gf = inject('graffiti')
       const myLinks = {}
       for (const context of ["Dog", "Cat", "Bird"]){
        myLinks[context] = gf.useLinks(context).links
        // for (const uuidobj of this.myLinks[context].value){
        //     uuidLinks[uuidobj.target]=gf.useLinks(uuidobj.target).links
        // }
       }
       console.log(myLinks)
       return {myLinks}
    },
    template: `
    <p id="selectfilters">What would you like to see today?</p>
    <div id="viewfilters">
        <input type="checkbox" id="dog" value = "Dog" v-model="checkedContextsToView">
        <label for ="dog" id="doglabel">Dog</label>
        <input type="checkbox" id="cat" value = "Cat" v-model="checkedContextsToView">
        <label for ="cat" id="catlabel">Cat</label>
        <input type="checkbox" id="bird" value = "Bird" v-model="checkedContextsToView">
        <label for ="bird" id="birdlabel">Bird</label>
    </div>
    <div id="postcontainer">
        <template v-for="uuid in filterContext">
            <graffiti-links v-slot="{ links }" :source = "uuid">
                <template v-for="post in links">
                    
                    <template v-if="post.target.type!='Like'">
                        
                        
                        <li class="container">
                            <hr class="post-divider">
                            <profile :gfme = "post.actor" :editable="false" :profilepage="false"></profile>
                            <img :src="post.target.image" class="center">
                            <button id = "likebutton" @click="like(uuid)">
                                🐾
                                <likes class="likes-component" :uuid="uuid">

                                </likes>
                            </button>
                            
                            
                            <template v-if="post.actor==$gf.me">
                                
                                <button id="deletebutton" @click="$gf.deleteLink(post)">
                                🗑️ Delete
                                </button>
                                
                            </template>
                            <p id = "caption">{{post.target.content}}</p>
                        </li>
                        
                        
                    </template>
                
                
                
                </template>
            </graffiti-links>
            
        

        </template>
    </div>
        
    
    `,
    data(){
        return {
            checkedContextsToView:[],
        }
    },
    components:{
        Profile,
        Likes
    },
    methods:{
        like(uuid){
            this.$gf.postLink(uuid, {
              type: 'Like',
              object: uuid
            })
          },
    },
    computed:{
        filterContext(){

            var set = new Set()
            for (const context of this.checkedContextsToView){
                console.log(this.myLinks[context].value)
                for (const uuidobj of this.myLinks[context].value){
                    set.add(uuidobj.target)
                }
                
            }
            return set
            const posts = []
            //set of uuids
            //each uuid connected to a post (of type Note) and a bunch of likes
            //want to go through each uuid
            for (const uuidtarget of set){
                // and go through everything connected to that uuid
                for (const linkobj of this.uuidLinks[uuidtarget].value){
                    //if object that is linked to uuid is of type Note
                    if (linkobj.target.type=='Note'){
                        //add this object to posts
                        posts.push(linkobj.target)
                    }
                }
            }
            posts.sort(function(a,b){
                return b.published-a.published;
              });
            return posts
              
              
        }
    }
}