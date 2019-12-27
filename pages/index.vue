<template>
  <div class="home">
    <Hero :headline="$prismic.richTextAsPlain(headline)"/>
    <div class="container">
      <prismic-rich-text :field="projectsHeadline" class="headline" />
      <div class="projects-section">
        <h3 class="small-header">My Work</h3>
        <section class="projects-grid">
          <projects-grid :projects="projects"/>
        </section>
        <div class="button-block">
          <nuxt-link to="/work" tag="button" class="primary">All projects</nuxt-link>
        </div>
      </div>
      <div class="headline">
        <prismic-rich-text :field="aboutHeadline" />
        <prismic-rich-text :field="aboutSubheading" />
        <div class="button-block">
          <nuxt-link to="/about" tag="button" class="primary">About me</nuxt-link>
          <a href="https://www.buymeacoffee.com/ramkumarshankar" target="_blank">
            <button class="outline">Buy me a coffee &#10141;</button>
          </a>
        </div>
      </div>
      <!-- <contact-section :text="contactText"/> -->
    </div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";
// import ContactSection from "@/components/ContactSection.vue";

export default {
  components: {
    Hero,
    ProjectsGrid,
    // ContactSection
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
      const projectsHeadline = document.projects_headline
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
      // Get contact section
      const contactSection = document.body[2].primary;
      const contactText = contactSection.contacttext;

      // Get about section
      const aboutSection = document.body[1].primary;
      const aboutHeadline = aboutSection.about_headline;
      const aboutSubheading = aboutSection.about_subheading;
      // const aboutHeadline = document.body[2].primary;
      // const contactText = contactSection.contacttext;

      return {
        documentId: result.id,
        headline: headline,
        projectsHeadline: projectsHeadline,
        projects: displayedProjects,
        aboutHeadline: aboutHeadline,
        aboutSubheading: aboutSubheading,
        contactText: contactText,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="stylus">
.home {
  .headline {
    width: 60%;
    text-align: center;
    margin: 80px auto;

    @media screen and (max-width: 800px) {
      width: auto;
    }
  }

  div.button-block {
    padding: 20px 0px;
    font-size: 1.125em;
    display: flex;
    align-items: center;
    justify-content: center;

    * {
      margin: 0px 10px;
    }
  }

  h2.section-header {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  div.contact-block {
    margin-bottom: 50px;
  }

  div.projects-section {
    padding-bottom: 30px;

    section.projects-grid {
      min-height: 300px;
      position: relative;
    }

    a {
      display: inline-block;
      color: $link-color;
    }
  }

}
</style>
