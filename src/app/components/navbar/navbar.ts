import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  @Input() isDarkMode = false;
  @Output() toggleDarkMode = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

  onNavClick(href: string): void {
    const targetId = href.replace('#', '');
    this.navigate.emit(targetId);
  }

  mobileMenuOpen = false;

  navItems = [
    { label: 'Tổng quan', href: '#overview' },
    { label: 'Vé', href: '#tickets' },
    { label: 'Lịch trình', href: '#itinerary' },
    { label: 'Địa điểm', href: '#destinations' },
    { label: 'Bản đồ', href: '#map' },
    { label: 'Budget', href: '#budget' },
    { label: 'Checklist', href: '#checklist' },
  ];

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
