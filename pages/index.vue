<template>
  <main class="home">
    <Hero :headline="$prismic.asText(headline)" />
    <div class="container">
      <prismic-rich-text :field="projectsHeadline" class="headline" />
      <section class="projects-section">
        <h3 class="small-header">My Work</h3>
        <section class="projects-grid">
          <projects-grid :projects="projects" />
        </section>
        <div class="button-block">
          <nuxt-link to="/work" tag="button" class="primary"
            >All projects</nuxt-link
          >
        </div>
      </section>
      <div class="headline">
        <prismic-rich-text :field="aboutHeadline" />
        <prismic-rich-text :field="aboutSubheading" />
        <div class="button-block">
          <nuxt-link to="/about" tag="button" class="primary min-width"
            >About me</nuxt-link
          >
          <a
            href="https://www.buymeacoffee.com/ramkumarshankar"
            target="_blank"
            rel="noopener"
          >
            <button class="outline min-width">Buy me a coffee &#10141;</button>
          </a>
        </div>
      </div>
      <contact-section :heading="contactHeading" :text="contactText" />
    </div>
  </main>
</template>

<script>
import Hero from '@/components/Hero.vue'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import ContactSection from '@/components/ContactSection.vue'

export default {
  components: {
    Hero,
    ProjectsGrid,
    ContactSection,
  },
  async asyncData({ $prismic, error }) {
    try {
      const result = await $prismic.api.getSingle('homepage', {
        fetchLinks: [
          'project.title',
          'project.image',
          'project.short_description',
        ],
      })
      const document = result.data
      // Headline
      const headline = document.headline
      const projectsHeadline = document.projects_headline
      // Get projects
      const projectsResponse = document.body[0].items
      const displayedProjects = []
      projectsResponse.forEach((project, index) => {
        displayedProjects.push({
          uid: project.featured_projects.uid,
          title: project.featured_projects.data.title,
          short_description: project.featured_projects.data.short_description,
          image: project.featured_projects.data.image,
          tags: project.featured_projects.tags,
        })
      })
      // Get contact section
      const contactSection = document.body[2].primary
      const contactHeading = contactSection.contactheading
      const contactText = contactSection.contacttext

      // Get about section
      const aboutSection = document.body[1].primary
      const aboutHeadline = aboutSection.about_headline
      const aboutSubheading = aboutSection.about_subheading

      // console.log(displayedProjects)
      return {
        documentId: result.id,
        headline,
        projectsHeadline,
        projects: displayedProjects,
        aboutHeadline,
        aboutSubheading,
        contactHeading,
        contactText,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="stylus">
.home {
  .headline {
    width: 70%;
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
    flex-wrap: wrap;

    * {
      margin: 5px 10px;
    }
  }

  h2.section-header {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  div.contact-block {
    margin-bottom: 50px;
  }

  section.projects-section {
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
