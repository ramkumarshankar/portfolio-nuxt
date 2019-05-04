<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu :tags="tags" @filterChanged="resetFilter" />
      <section class="projects-section">
        <projects-grid :projects="displayedProjects"/>
      </section>
      <!-- <pagination :numPages="numPages" :activePage="activePage" @pageChanged="retrievePage"/> -->
    </div>
  </div>
</template>

<script>
import Prismic from "prismic-javascript"
import ProjectsGrid from "@/components/ProjectsGrid.vue";
import FilterMenu from "@/components/FilterMenu.vue";
// import Pagination from "@/components/Pagination.vue";

export default {
  name: "Work",
  head() {
    return {
      titleTemplate: '%s | Work'
    }
  },
  components: {
    FilterMenu,
    ProjectsGrid
    // Pagination
  },
  async asyncData({app, error, req}) {
    try {
      const response = await app.api.query(Prismic.Predicates.at("document.type", "project"), {
        fetch: [
          "project.title",
          "project.short_description",
          "project.image",
          "project.link"
        ],
        orderings: "[document.last_publication_date desc]",
        // keep page size large to get all projects
        pageSize: 100
      });
      const projects = response.results;
      const allProjects = [];
      projects.forEach(projectItem => {
        allProjects.push({
          id: projectItem.id,
          title: projectItem.data.title,
          short_description: projectItem.data.short_description,
          image: projectItem.data.image,
          link: projectItem.data.link,
          tags: projectItem.tags
        });
      });
      const rawList = [];
      projects.forEach(project => {
        rawList.push(project.tags);
      });

      const fullTagList = ["all"].concat(...rawList);
      fullTagList.forEach((tag, index) => {
        if (tag === "featured" || tag === "Featured") {
          fullTagList.splice(index, 1);
        }
      });
      const filterTags = fullTagList.filter(
        (tag, i, arr) => arr.indexOf(tag) === i
      );
      return {
        projects: allProjects,
        displayedProjects: allProjects,
        tags: filterTags,
        numPages: parseInt(Math.ceil(projects.length / 9)),
        activePage: 1,
        selectedTag: "all"
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    resetFilter(tag) {
      if (this.selectedTag !== tag) {
        this.selectedTag = tag;
        this.activePage = 1;
        this.displayedProjects = []
        this.$nextTick(() => {
          if (this.selectedTag === 'all') {
            this.displayedProjects = this.projects;
          } else {
            this.displayedProjects = this.projects.filter(project => {
              return project.tags.includes(this.selectedTag)
            })
          }
        })
      }
    },
    retrievePage(page) {
      this.activePage = page;
      // this.retrieveProjects(this.selectedTag);
    },
  //   defaultQueryParams() {
  //     return {
  //       fetch: [
  //         "project.title",
  //         "project.short_description",
  //         "project.image",
  //         "project.link"
  //       ],
  //       orderings: "[document.last_publication_date desc]",
  //       pageSize: this.pageSize,
  //       page: this.activePage
  //     };
  //   },
  //   setupPagination(response) {
  //     this.numPages = response.total_pages;
  //     this.activePage = response.page;
  //   },
  }
};
</script>

<style lang="stylus" scoped>
h1.page-headline {
  margin-top: 50px;
  margin-bottom: 20px;
}

section.projects-section {
  position: relative;
  min-height: 300px;
}
</style>
