

//Stories
let audioPlaying = false;

        function toggleAudio() {
            const btn = document.querySelector('.storybook-play-btn');
            if (audioPlaying) {
                btn.textContent = '▶';
                audioPlaying = false;
            } else {
                btn.textContent = '⏸';
                audioPlaying = true;
            }
        }

        function scrollToPage(pageNum) {
            const page = document.getElementById(`page${pageNum}`);
            if (page) {
                page.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Add smooth scroll behavior for all cards
        document.querySelectorAll('.storybook-similar-card').forEach(card => {
            card.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Add entrance animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.storybook-page').forEach(page => {
            observer.observe(page);
        });

        // Audio progress simulation
        let audioProgress = 0;
        let audioInterval;

        function updateAudioProgress() {
            const timeDisplay = document.querySelector('.storybook-audio-time');
            const minutes = Math.floor((300 - audioProgress) / 60);
            const seconds = (300 - audioProgress) % 60;
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            audioProgress += 1;
            if (audioProgress >= 300) {
                toggleAudio();
                audioProgress = 0;
            }
        }

        function toggleAudio() {
            const btn = document.querySelector('.storybook-play-btn');
            if (audioPlaying) {
                btn.textContent = '▶';
                audioPlaying = false;
                clearInterval(audioInterval);
            } else {
                btn.textContent = '⏸';
                audioPlaying = true;
                audioInterval = setInterval(updateAudioProgress, 1000);
            }
        }


     //Navbar
     class NavbarSearch {
            constructor() {
                this.searchInput = document.getElementById('searchInput');
                this.searchBtn = document.getElementById('searchBtn');
                this.searchSuggestions = document.getElementById('searchSuggestions');
                this.searchStatus = document.getElementById('searchStatus');
                this.resultItems = document.querySelectorAll('.result-item');
                this.userIcon = document.getElementById('userIcon');
                this.signinModal = document.getElementById('signinModal');
                this.closeModal = document.getElementById('closeModal');
                this.signinForm = document.getElementById('signinForm');
                
                // Sample suggestions for search
                this.suggestions = [
                    'home page',
                    'stories',
                    'about us',
                    'contact',
                    'blog',
                    'articles',
                    'news',
                    'team',
                    'mission',
                    'support'
                ];
                
                this.init();
                this.initModal();
            }

            init() {
                // Search input events
                this.searchInput.addEventListener('input', (e) => {
                    this.handleSearch(e.target.value);
                    this.showSuggestions(e.target.value);
                });

                this.searchInput.addEventListener('focus', () => {
                    if (this.searchInput.value.length > 0) {
                        this.showSuggestions(this.searchInput.value);
                    }
                });

                this.searchInput.addEventListener('blur', () => {
                    setTimeout(() => {
                        this.hideSuggestions();
                    }, 200);
                });

                // Search button click
                this.searchBtn.addEventListener('click', () => {
                    this.handleSearch(this.searchInput.value);
                    this.hideSuggestions();
                });

                // Enter key search
                this.searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.handleSearch(this.searchInput.value);
                        this.hideSuggestions();
                    }
                });

                // Click outside to close suggestions
                document.addEventListener('click', (e) => {
                    if (!this.searchInput.contains(e.target) && !this.searchSuggestions.contains(e.target)) {
                        this.hideSuggestions();
                    }
                });
            }

            initModal() {
                // User icon click to open modal
                this.userIcon.addEventListener('click', () => {
                    this.openModal();
                });

                // Close modal events
                this.closeModal.addEventListener('click', () => {
                    this.closeSigninModal();
                });

                // Click outside modal to close
                this.signinModal.addEventListener('click', (e) => {
                    if (e.target === this.signinModal) {
                        this.closeSigninModal();
                    }
                });

                // Escape key to close modal
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.signinModal.classList.contains('active')) {
                        this.closeSigninModal();
                    }
                });

                // Form submission
                this.signinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSignin();
                });

                // Social signin buttons
                document.getElementById('googleSignin').addEventListener('click', () => {
                    this.handleSocialSignin('google');
                });

                document.getElementById('facebookSignin').addEventListener('click', () => {
                    this.handleSocialSignin('facebook');
                });
            }

            openModal() {
                this.signinModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus on email input after modal opens
                setTimeout(() => {
                    document.getElementById('email').focus();
                }, 300);
            }

            closeSigninModal() {
                this.signinModal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Clear form
                this.signinForm.reset();
            }

            handleSignin() {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Simulate signin process
                if (email && password) {
                    // Show loading state
                    const submitBtn = this.signinForm.querySelector('.signin-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Signing In...';
                    submitBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        alert(`Welcome back! Signed in as: ${email}`);
                        this.closeSigninModal();
                        
                        // Reset button
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                }
            }

            handleSocialSignin(provider) {
                alert(`Redirecting to ${provider} signin...`);
                // Here you would typically redirect to the social provider's OAuth flow
            }

            handleSearch(query) {
                const searchTerm = query.toLowerCase().trim();
                let visibleResults = 0;

                if (searchTerm === '') {
                    // Hide all results when search is empty
                    this.resultItems.forEach(item => {
                        item.classList.remove('show');
                    });
                    this.searchStatus.style.display = 'none';
                } else {
                    // Filter results based on search term
                    this.resultItems.forEach(item => {
                        const keywords = item.getAttribute('data-keywords').toLowerCase();
                        const title = item.querySelector('.result-title').textContent.toLowerCase();
                        const description = item.querySelector('.result-description').textContent.toLowerCase();
                        
                        if (keywords.includes(searchTerm) || 
                            title.includes(searchTerm) || 
                            description.includes(searchTerm)) {
                            item.classList.add('show');
                            this.highlightText(item, searchTerm);
                            visibleResults++;
                        } else {
                            item.classList.remove('show');
                        }
                    });

                    // Show search status
                    this.searchStatus.style.display = 'block';
                    if (visibleResults > 0) {
                        this.searchStatus.textContent = `Found ${visibleResults} result(s) for "${query}"`;
                        this.searchStatus.style.color = '#666';
                    } else {
                        this.searchStatus.textContent = `No results found for "${query}"`;
                        this.searchStatus.style.color = '#e53e3e';
                    }
                }
            }

            highlightText(element, searchTerm) {
                const title = element.querySelector('.result-title');
                const description = element.querySelector('.result-description');
                
                // Remove previous highlights
                title.innerHTML = title.textContent;
                description.innerHTML = description.textContent;
                
                // Add new highlights
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                title.innerHTML = title.textContent.replace(regex, '<span class="highlight">$1</span>');
                description.innerHTML = description.textContent.replace(regex, '<span class="highlight">$1</span>');
            }

            showSuggestions(query) {
                if (query.length < 2) {
                    this.hideSuggestions();
                    return;
                }

                const filteredSuggestions = this.suggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 5);

                if (filteredSuggestions.length > 0) {
                    this.searchSuggestions.innerHTML = filteredSuggestions
                        .map(suggestion => 
                            `<div class="suggestion-item" onclick="navbarSearch.selectSuggestion('${suggestion}')">
                                <svg class="suggestion-icon" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                                ${suggestion}
                            </div>`
                        ).join('');
                    this.searchSuggestions.style.display = 'block';
                } else {
                    this.hideSuggestions();
                }
            }

            selectSuggestion(suggestion) {
                this.searchInput.value = suggestion;
                this.handleSearch(suggestion);
                this.hideSuggestions();
                this.searchInput.focus();
            }

            hideSuggestions() {
                this.searchSuggestions.style.display = 'none';
            }

            clearSearch() {
                this.searchInput.value = '';
                this.handleSearch('');
                this.hideSuggestions();
            }
        }

        // Initialize the navbar search functionality
        const navbarSearch = new NavbarSearch();


        ///Story Play 
         class VoiceOverPlayer {
            constructor() {
                this.isPlaying = false;
                this.duration = 300; // 5 minutes in seconds
                this.currentTime = 0;
                this.interval = null;
                
                this.playPauseBtn = document.getElementById('playPauseBtn');
                this.playIcon = document.getElementById('playIcon');
                this.pauseIcon = document.getElementById('pauseIcon');
                this.progressFill = document.getElementById('progressFill');
                this.progressThumb = document.getElementById('progressThumb');
                this.progressTrack = document.getElementById('progressTrack');
                this.timeDisplay = document.getElementById('timeDisplay');
                this.audioPlayer = document.querySelector('.custom-audio-player');
                
                this.initializeEvents();
                this.synthesizeAudio();
            }
            
            initializeEvents() {
                this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
                this.progressTrack.addEventListener('click', (e) => this.seekAudio(e));
            }
            
            synthesizeAudio() {
                // Check if Speech Synthesis is supported
                if ('speechSynthesis' in window) {
                    this.synthesis = window.speechSynthesis;
                    this.utterance = new SpeechSynthesisUtterance();
                    
                    this.utterance.text = `The voice returned, but this time, it laughed—a warm, rolling sound like thunder learning to smile. The dream is alive. Doomsday is not today. And just like that, Willowdrop was saved—not by warriors or machines, but by a group of kids who remembered how to imagine.`;
                    
                    this.utterance.rate = 0.9;
                    this.utterance.pitch = 1.1;
                    this.utterance.volume = 0.8;
                    
                    // Set up event listeners for speech synthesis
                    this.utterance.onstart = () => {
                        this.isPlaying = true;
                        this.startProgressTracking();
                    };
                    
                    this.utterance.onend = () => {
                        this.isPlaying = false;
                        this.stopProgressTracking();
                        this.resetPlayer();
                    };
                    
                    this.utterance.onpause = () => {
                        this.isPlaying = false;
                        this.stopProgressTracking();
                    };
                    
                    this.utterance.onresume = () => {
                        this.isPlaying = true;
                        this.startProgressTracking();
                    };
                    
                    // Try to get a more natural voice
                    this.synthesis.addEventListener('voiceschanged', () => {
                        const voices = this.synthesis.getVoices();
                        const preferredVoice = voices.find(voice => 
                            voice.name.includes('Natural') || 
                            voice.name.includes('Enhanced') ||
                            voice.lang.includes('en-US')
                        );
                        if (preferredVoice) {
                            this.utterance.voice = preferredVoice;
                        }
                    });
                }
            }
            
            togglePlayPause() {
                if (!this.synthesis) return;
                
                if (this.isPlaying) {
                    this.pauseAudio();
                } else {
                    this.playAudio();
                }
            }
            
            playAudio() {
                if (!this.synthesis) return;
                
                if (this.synthesis.paused) {
                    this.synthesis.resume();
                } else {
                    this.synthesis.speak(this.utterance);
                }
                
                this.isPlaying = true;
                this.updatePlayPauseButton();
                this.audioPlayer.classList.add('playing-animation');
            }
            
            pauseAudio() {
                if (!this.synthesis) return;
                
                this.synthesis.pause();
                this.isPlaying = false;
                this.updatePlayPauseButton();
                this.audioPlayer.classList.remove('playing-animation');
            }
            
            stopAudio() {
                if (!this.synthesis) return;
                
                this.synthesis.cancel();
                this.isPlaying = false;
                this.currentTime = 0;
                this.updateProgress();
                this.updatePlayPauseButton();
                this.audioPlayer.classList.remove('playing-animation');
            }
            
            updatePlayPauseButton() {
                if (this.isPlaying) {
                    this.playIcon.style.display = 'none';
                    this.pauseIcon.style.display = 'flex';
                } else {
                    this.playIcon.style.display = 'block';
                    this.pauseIcon.style.display = 'none';
                }
            }
            
            startProgressTracking() {
                this.stopProgressTracking();
                this.interval = setInterval(() => {
                    if (this.currentTime < this.duration) {
                        this.currentTime += 0.1;
                        this.updateProgress();
                    } else {
                        this.stopProgressTracking();
                    }
                }, 100);
            }
            
            stopProgressTracking() {
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            }
            
            updateProgress() {
                const progressPercent = (this.currentTime / this.duration) * 100;
                this.progressFill.style.width = `${progressPercent}%`;
                this.progressThumb.style.left = `${progressPercent}%`;
                
                const remainingTime = this.duration - this.currentTime;
                const minutes = Math.floor(remainingTime / 60);
                const seconds = Math.floor(remainingTime % 60);
                this.timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            seekAudio(event) {
                const rect = this.progressTrack.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickPercent = clickX / rect.width;
                
                this.currentTime = clickPercent * this.duration;
                this.updateProgress();
                
                // For speech synthesis, we need to restart from beginning
                if (this.isPlaying) {
                    this.stopAudio();
                    setTimeout(() => this.playAudio(), 100);
                }
            }
            
            resetPlayer() {
                this.currentTime = 0;
                this.updateProgress();
                this.updatePlayPauseButton();
                this.audioPlayer.classList.remove('playing-animation');
            }
        }
        
        // Initialize the player when the page loads
        window.addEventListener('load', () => {
            new VoiceOverPlayer();
        });
//Contact
class ContactFormManager {
            constructor() {
                this.form = document.getElementById('contactForm');
                this.submitBtn = document.getElementById('submitBtn');
                this.successModal = document.getElementById('successModal');
                this.closeModal = document.getElementById('closeModal');
                this.okBtn = document.getElementById('okBtn');
                this.sendAnotherBtn = document.getElementById('sendAnotherBtn');
                this.messageDetails = document.getElementById('messageDetails');
                
                this.init();
            }

            init() {
                // Form submission
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleFormSubmit();
                });

                // Modal close events
                this.closeModal.addEventListener('click', () => {
                    this.closeSuccessModal();
                });

                this.okBtn.addEventListener('click', () => {
                    this.closeSuccessModal();
                });

                this.sendAnotherBtn.addEventListener('click', () => {
                    this.resetFormAndCloseModal();
                });

                // Click outside modal to close
                this.successModal.addEventListener('click', (e) => {
                    if (e.target === this.successModal) {
                        this.closeSuccessModal();
                    }
                });

                // Escape key to close modal
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.successModal.classList.contains('active')) {
                        this.closeSuccessModal();
                    }
                });

                // Real-time validation
                this.addInputValidation();
            }

            addInputValidation() {
                const inputs = this.form.querySelectorAll('.form-input');
                
                inputs.forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });

                    input.addEventListener('input', () => {
                        if (input.parentElement.classList.contains('has-error')) {
                            this.validateField(input);
                        }
                    });
                });
            }

            validateField(field) {
                const fieldGroup = field.parentElement;
                const isValid = this.isFieldValid(field);

                if (isValid) {
                    fieldGroup.classList.remove('has-error');
                    field.classList.remove('error');
                } else {
                    fieldGroup.classList.add('has-error');
                    field.classList.add('error');
                }

                return isValid;
            }

            isFieldValid(field) {
                const value = field.value.trim();
                
                if (field.required && !value) {
                    return false;
                }

                if (field.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                }

                if (field.type === 'tel' && value) {
                    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                    return phoneRegex.test(value);
                }

                return true;
            }

            validateForm() {
                const inputs = this.form.querySelectorAll('.form-input[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });

                return isValid;
            }

            handleFormSubmit() {
                if (!this.validateForm()) {
                    this.showValidationErrors();
                    return;
                }

                // Show loading state
                this.showLoadingState();

                // Simulate form submission
                setTimeout(() => {
                    this.showSuccessModal();
                    this.hideLoadingState();
                }, 2000);
            }

            showLoadingState() {
                this.submitBtn.disabled = true;
                this.submitBtn.classList.add('loading');
                this.submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
            }

            hideLoadingState() {
                this.submitBtn.disabled = false;
                this.submitBtn.classList.remove('loading');
                this.submitBtn.querySelector('.btn-text').textContent = 'SEND NOW';
            }

            showValidationErrors() {
                // Scroll to first error
                const firstError = this.form.querySelector('.has-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }

            showSuccessModal() {
                // Populate modal with form data
                this.populateModalDetails();
                
                // Show modal
                this.successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            populateModalDetails() {
                const formData = {
                    'Full Name': document.getElementById('fullName').value,
                    'Email': document.getElementById('email').value,
                    'Phone': document.getElementById('phone').value || 'Not provided',
                    'Message': document.getElementById('message').value
                };

                const detailsHTML = Object.entries(formData)
                    .map(([label, value]) => {
                        const displayValue = value.length > 50 ? value.substring(0, 50) + '...' : value;
                        return `
                            <div class="detail-row">
                                <span class="detail-label">${label}:</span>
                                <span class="detail-value">${displayValue}</span>
                            </div>
                        `;
                    }).join('');

                this.messageDetails.innerHTML = detailsHTML;
            }

            closeSuccessModal() {
                this.successModal.classList.remove('active');
                document.body.style.overflow = '';
            }

            resetFormAndCloseModal() {
                this.form.reset();
                this.clearValidationErrors();
                this.closeSuccessModal();
                
                // Focus on first input
                document.getElementById('fullName').focus();
            }

            clearValidationErrors() {
                const errorGroups = this.form.querySelectorAll('.has-error');
                const errorInputs = this.form.querySelectorAll('.form-input.error');

                errorGroups.forEach(group => group.classList.remove('has-error'));
                errorInputs.forEach(input => input.classList.remove('error'));
            }
        }

        // Initialize the contact form manager
        document.addEventListener('DOMContentLoaded', () => {
            new ContactFormManager();
        });

        // Add some visual enhancement animations
        document.addEventListener('DOMContentLoaded', function() {
            // Animate form fields on focus
            const formInputs = document.querySelectorAll('.form-input');
            
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'translateX(5px)';
                    this.parentElement.style.transition = 'transform 0.3s ease';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'translateX(0)';
                });
            });

            // Animate contact images
            const contactImages = document.querySelectorAll('.contact-image');
            
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, index * 200);
                    }
                });
            }, { threshold: 0.1 });

            contactImages.forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'translateY(30px) scale(0.95)';
                img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                imageObserver.observe(img);
            });
        });
      
          