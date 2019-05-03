<template>
  <div class="home">
    <Hero :headline="$prismic.richTextAsPlain(headline)"/>
    <div class="container">
      <div class="projects-section">
        <h2 class="section-header">Featured Work</h2>
        <section class="projects-grid">
          <projects-grid :projects="projects"/>
        </section>
        <div class="more-projects-block">
          <nuxt-link to="/work">More projects &#10141;</nuxt-link>
        </div>
      </div>
      <teaching-section :title="$prismic.richTextAsPlain(teachingHeading)" :body="teachingBody"/>
      <contact-section :text="contactText"/>
    </div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";
import TeachingSection from "@/components/TeachingSection.vue";
import ContactSection from "@/components/ContactSection.vue";

export default {
  components: {
    Hero,
    ProjectsGrid,
    TeachingSection,
    ContactSection
  },
  async asyncData({app, error, req}) {
    try {
      const result = await app.api.getSingle("homepage", {
        fetchLinks: [
          "project.title",
          "project.image",
          "project.short_description"
        ]
      })
      const document = result.data
      // Headline
      // const headline = this.$prismic.richTextAsPlain(document.data.headline)
      const headline = document.headline
      // Get projects
      const projectsResponse = document.body[0].items;
      const displayedProjects = [];
      projectsResponse.forEach((project, index) => {
        displayedProjects.push({
          title: project.featured_projects.data.title,
          short_description:
            project.featured_projects.data.short_description,
          image: project.featured_projects.data.image,
          link: project.featured_projects,
          tags: project.featured_projects.tags
        });
      });
      // Get teaching section
      const teachingSection = document.body[1].primary;
      const teachingHeading = teachingSection.teachingheading;
      const teachingBody = teachingSection.teachingbody;
      // Get contact section
      const contactSection = document.body[2].primary;
      const contactText = contactSection.contacttext;

      return {
        documentId: result.id,
        headline: headline,
        projects: displayedProjects,
        teachingHeading: teachingHeading,
        teachingBody: teachingBody,
        contactText: contactText,
      }
    } catch (e) {
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="stylus">
.home {
  h2.section-header {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  div.contact-block {
    margin-bottom: 50px;
  }

  div.projects-section {
    border-bottom: solid 1px #DDD;
    padding-bottom: 30px;

    section.projects-grid {
      min-height: 300px;
      position: relative;
    }

    div.more-projects-block {
      text-align: right;
    }

    a {
      display: inline-block;
      color: $link-color;
    }
  }

}
</style>
