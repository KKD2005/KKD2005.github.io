import { inject, createApp, toRef } from 'vue'
export default{
    props: ['uuid'],
    template: '',
    setup(props){
      const gf = inject('graffiti')
      return gf.useLinks(props.uuid)
      // const { links } = gf.useLinks(props.uuid)
      // console.log(links)
      // alllikes = []
      // for (let link in links){
      //   console.log(link.target)
      //   if (link.target.type=='Like'){
      //     alllikes.push(link.target)
      //     console.log(alllikes)
      //   }
      // }
      // const map1 = alllikes.map((x) => x.actor)
      // console.log(map1)
      // var set = new Set(map1)
      // return length(set)
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