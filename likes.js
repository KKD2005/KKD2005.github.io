import { inject, createApp, toRef } from 'vue'
export default{
    props: ['uuid'],
    template: '<p id="numberoflikes">{{numberoflikes}}</p>',
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
      numberoflikes(){
        const alllikes = []
        for (let link of this.links){
          console.log(link.target)
          if (link.target && link.target.type=='Like'){
            alllikes.push(link.target)
            console.log(alllikes)
          }
        }
        const map1 = alllikes.map((x) => x.actor)
        console.log(map1)
        var set = new Set(map1)
        return set.size
      }
    }
  }