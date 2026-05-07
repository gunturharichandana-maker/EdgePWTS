import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoggedInPage extends BasePage {
  readonly successHeading: Locator;
  readonly successMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.successHeading = page.locator('h1', { hasText: 'Logged In Successfully' });
    this.successMessage = page.locator('strong', { hasText: 'Congratulations' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async logout() {
    await this.logoutLink.click();
  }
}
