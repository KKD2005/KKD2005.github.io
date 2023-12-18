import { inject, createApp, toRef } from 'vue'
export default {
          
    props:['gfme', 'editable', 'profilepage'],
    template: `
    <div v-if="profilepage">
      <div class="profilecontainer">
        <div class="profilepagepicture">
          <img :src="getProfilePicture">
        </div>
        
        {{getUsername}}
        
        
        
        
      </div>
      <div v-if="editable">
        
        <form  @submit.prevent="makeProfileEdits" class="editprofile">
          <p id="edittitle">Edit your profile</p>
          <p id="warning">WARNING: Please enter both a username and profile picture before saving edits.</p>
          <label class="usernamelabel" for="username">Enter a new username:</label>
          <input type="text" id="username" name="username" v-model = "username" maxlength="20" oninput="enforceMaxLength(this)">
          <label class="profilepicturelabel" for="profilepictureupload">Enter a new profile picture:</label>
          <input type="file" @change="previewProfilePicture" class="profilepictureupload">
          <input type="submit" value="Save Edits" class="submitedits">
        </form>
      </div>
    </div>
    <div v-else>
      <div class="feedprofilecontainer">
        <div class="feedprofilepicture">
          <img :src="getProfilePicture">
        </div>
      
        <span>{{getUsername}}</span>
      
      
      
      
      </div>
    </div>
    `
    , 
    data(){
      return{
        profilepicture:null,
        username: null,
      }
    },
    setup(props){
      const gf = inject('graffiti')
      return gf.useLinks(toRef(props,'gfme'))
    },
    computed:{
      getProfilePicture(){
        for (let link of this.links){
          console.log("getting profile picture")
          console.log(link.target)
          if (link.target.type=='Profile'){
            return link.target.image
          }
        }
        return "media/download.png"
      },
      getUsername(){
        for (let link of this.links){
          console.log("getting username")
          console.log(link.target)
          if (link.target.type=='Profile'){
            return link.target.name
          }
        }
        return this.gfme
      }
    },
    methods:{

      async makeProfileEdits(){
        for (let link of this.links){
          console.log(link.target)
          if (link.target.type=='Profile'){
            this.$gf.deleteLink(link)
          }
        }
        let dataURL = null
        if (this.profilepicture){
          const reader = new FileReader()
          reader.readAsDataURL(this.profilepicture)
          dataURL = await new Promise(resolve =>{
            reader.onload = e=> resolve(e.target.result)
          })
        }
        console.log(this.username)
        console.log(dataURL)
        this.$gf.postLink(this.gfme, {
          type: 'Profile', 
          name: this.username,
          image: dataURL,
          published: Date.now()
          
        });
        this.username=null;
        this.profilepicture=null;
        
      }, 
      previewProfilePicture(event){
        console.log(event.target.files);
        this.profilepicture = event.target.files[0]
        console.log(this.profilepicture)
      },
      enforceMaxLength(element) {
        // Get the maximum length from the maxlength attribute
        const maxLength = element.getAttribute('maxlength');
  
        // Trim the input value if it exceeds the maximum length
        if (element.value.length > maxLength) {
          element.value = element.value.slice(0, maxLength);
        }
      }
    }
  }