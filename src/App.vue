<template>
  <div id="app"> 
    <img alt="Vue logo" src="./assets/logo.png">
   
    <MenuViewer />
    <div class="assignments"><AssignmentSection /></div>
   
   <!--  <router-view></router-view> -->
  </div>
</template>

<script>
import MenuViewer from './components/MenuViewer.vue'
import AssignmentSection from './components/AssignmentSection.vue';
import browserStorage  from '@/browser/BrowserStorage' 
import defaultAssignmentData from '@/defaultAssignmentData'
import Assignment from '@/models/Assignment'

export default {
    components: {
        MenuViewer,
        AssignmentSection
  
  },
  created () {
    
   
    
    let initialData =browserStorage.Get();
    if(initialData==null)
    {
    initialData = defaultAssignmentData
     }
     console.log('initialData', initialData)
     Assignment.insert({ data: initialData })
  }
}
</script>
<style src="./styles/bootstrap.css"></style>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.App {
  padding: 96px 48px 128px;
}

.container {
  display: flex;
  margin: 0 auto;
  width: 960px;
}

.assignments {
  padding-right: 48px;
  padding-left: 48px;
  width: 100% ;
}
.users {
  padding-right: 48px;
  width: calc(100% / 3);
}
.todos {
  width: calc((100% / 3) * 2);
}


</style>