package net.dbs.sb;

import java.util.UUID;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import ch.rasc.extclassgenerator.Model;
import ch.rasc.extclassgenerator.ModelField;


@Model(value = "Starter.model.User", paging = true, createMethod = "storeService.create", readMethod = "storeService.read", updateMethod = "storeService.update", destroyMethod = "storeService.destroy")
public class User {

	private String id;

	@ModelField(convert = "null")
	private String firstName;

	@NotNull
	@ModelField(convert = "null")
	private String lastName;

	@Email
	@ModelField(convert = "null")
	private String email;

	@ModelField(convert = "null")
	private String department;

	public User() {
		// default constructor
	}

	public User(String firstName, String lastName, String email, String department) {
		this.id = UUID.randomUUID().toString();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.department = department;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDepartment() {
		return department;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", department=" + department + "]";
	}

}
