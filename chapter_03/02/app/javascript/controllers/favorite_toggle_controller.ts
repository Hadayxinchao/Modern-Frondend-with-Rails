import { Controller } from "@hotwired/stimulus";

export default class FavoriteToggleController extends Controller {
  toggle(): void {
    console.log("Click!")
  }
}
