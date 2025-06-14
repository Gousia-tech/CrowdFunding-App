package com.smiledonors.Login.Security;

import com.smiledonors.Login.Model.Donor;
import com.smiledonors.Login.Model.Organization;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final String email;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Donor donor) {
        this.email = donor.getEmail();
        this.password = donor.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_DONOR"));
    }

    public CustomUserDetails(Organization org) {
        this.email = org.getEmail();
        this.password = org.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ORGANIZATION"));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
