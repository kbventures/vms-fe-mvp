import { LitElement, html, css } from 'lit';

class Profile extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .card-header {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .card-content {
      font-size: 1rem;
      margin-bottom: 12px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 16px;
    }
    .profile-header {
      display: flex;
      align-items: center;
    }
    .social-links a {
      margin: 0 8px;
      text-decoration: none;
      color: #0077b5; /* LinkedIn blue */
    }
  `;

  static properties = {
    profileData: { type: Object },
  };

  constructor() {
    super();
    this.profileData = {};
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/profile.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.id && data.email && data.schemaVersion && data.name && data.insertedAt) {
          this.profileData = data;
          this.requestUpdate();
        } else {
          console.error('Missing required profile fields');
          this.profileData = { error: 'Required fields missing in profile data.' };
        }
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        this.profileData = { error: 'Failed to load profile data: ' + error.message };
      });
  }

  render() {
    return html`
      <div class="card">
        ${this.profileData.error
          ? html`<p>Error: ${this.profileData.error}</p>`
          : html`
              <div class="card-header">Volunteer Profile</div>
              <div class="card-content">
                <div class="profile-header">
                  <!-- Avatar from the profileData.avatar URL -->
                  <img class="avatar" src="${this.profileData.avatar || '/default-avatar.png'}" alt="Avatar" />
                  <div>
                    <p><strong>ID:</strong> ${this.profileData.id}</p>
                    <p><strong>Email:</strong> ${this.profileData.email}</p>
                    <p><strong>Name:</strong> ${this.profileData.name}</p>
                    <p><strong>Description:</strong> ${this.profileData.description || 'No description available'}</p>
                    <p><strong>Created At:</strong> ${this.profileData.happenedAt || 'Not available'}</p>
                    <p><strong>Inserted At:</strong> ${this.profileData.insertedAt}</p>
                  </div>
                </div>
                <div class="social-links">
                  ${this.profileData.socialLinks
                    ? html`
                        ${this.profileData.socialLinks.linkedin
                          ? html`<a href="${this.profileData.socialLinks.linkedin}" target="_blank">LinkedIn</a>`
                          : ''}
                        ${this.profileData.socialLinks.twitter
                          ? html`<a href="${this.profileData.socialLinks.twitter}" target="_blank">Twitter</a>`
                          : ''}
                        ${this.profileData.socialLinks.github
                          ? html`<a href="${this.profileData.socialLinks.github}" target="_blank">GitHub</a>`
                          : ''}
                      `
                    : ''}
                </div>
              </div>
            `}
      </div>
    `;
  }
}

customElements.define('volunteer-profile', Profile);
