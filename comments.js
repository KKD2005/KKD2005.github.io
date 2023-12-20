import { inject, createApp, toRef } from 'vue'
export default{
    props: ['uuid'],
    template: '',
    setup(props){
      const gf = inject('graffiti')
      return gf.useLinks(props.uuid)
    },
    computed: {
      getcomments(){
        const allcomments = []
        for (let link of this.links){
          console.log(link.target)
          if (link.target && link.target.type=='Note' && "inReplyTo" in link.target){
            allcomments.push(link.target)
            console.log(allcomments)
          }
        }
        return allcomments
      }
    }
  }