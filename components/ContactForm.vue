<template>
  <form
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="botfield"
    action="/thanks"
  >
    <div class="form-input">
      <input type="hidden" name="form-name" value="contact">
      <div style="display: none">
        <label for="botfield">Don’t fill this out if you're human</label>
        <input id="botfield" type="text" name="botfield">
      </div>
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" placeholder="full name" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="email address"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        >
      </div>
      <div class="message">
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="message" required/>
      </div>
    </div>
    <button class="primary" type="submit">Send Message</button>
  </form>
</template>

<script>
export default {
  name: 'ContactForm',
}
</script>

<style lang="stylus" scoped>
.form-input {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  margin-bottom: 30px;
  column-gap: 20px;
  grid-column-gap: 20px;
  row-gap: 20px;
  grid-row-gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr !important;
  }
}

label {
  font-family: $base-body-font-family;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  font-size: 1.125em;
  padding: 10px 10px;
  border: 1px solid darken($snow, 20);
  // box-shadow: inset 0 1px 1px 0 rgba(0,0,0,0.50)
  border-radius: 2px;

  @media only screen and (prefers-color-scheme: dark) {
    border: 1px solid lighten($snow-dark, 20);
  }
}

textarea {
  width: 100%;
  font-size: 1.125em;
  padding: 10px 10px;
  border: 1px solid darken($snow, 20);
  resize: vertical;
  border-radius: 2px;
  height: 200px;
  @media only screen and (prefers-color-scheme: dark) {
    border: 1px solid lighten($snow-dark, 20);
  }
}

div.message {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>