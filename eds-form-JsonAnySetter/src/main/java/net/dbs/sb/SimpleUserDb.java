package net.dbs.sb;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.zip.Inflater;
import java.util.zip.InflaterInputStream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import com.google.common.collect.Collections2;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.google.common.io.CharStreams;
import com.google.common.io.InputSupplier;

@Component
public class SimpleUserDb {

	private Map<String, User> users;

	private final ImmutableList<String> departments;

	@Autowired
	Resource randomdata;

	public SimpleUserDb() {
		departments = ImmutableList
				.<String> builder()
				.add("Accounting", "Advertising", "Asset Management", "Customer Relations", "Customer Service",
						"Finances", "Human Resources", "Legal Department", "Media Relations", "Payroll",
						"Public Relations", "Quality Assurance", "Sales and Marketing", "Research and Development",
						"Tech Support").build();
	}

	@PostConstruct
	public void initData() throws IOException {
		users = new ConcurrentHashMap<>();

		List<String> lines = CharStreams.readLines(newInputSupplier());

		for (String line : lines) {
			List<String> row = Lists.newArrayList(Splitter.on("|").split(line));

			User u = new User(row.get(0), row.get(1), row.get(2), row.get(3));
			users.put(u.getId(), u);
		}

	}

	public ImmutableList<User> find(final String filter) {
		if (StringUtils.hasText(filter)) {
			return ImmutableList.copyOf(Collections2.filter(users.values(), new Predicate<User>() {
				@Override
				public boolean apply(User input) {
					String lowerCaseFilter = filter.toLowerCase();
					return input.getFirstName().toLowerCase().contains(lowerCaseFilter)
							|| input.getLastName().toLowerCase().contains(lowerCaseFilter)
							|| input.getEmail().toLowerCase().contains(lowerCaseFilter);
				}
			}));
		}
		return ImmutableList.copyOf(users.values());
	}

	public ImmutableList<User> findAllFromDepartment(final String department) {

		ImmutableList.Builder<User> builder = ImmutableList.builder();

		builder.addAll(Collections2.filter(users.values(), new Predicate<User>() {
			@Override
			public boolean apply(User input) {
				return input.getDepartment().equals(department);
			}
		}));

		return builder.build();

	}

	public User findUser(String id) {
		return users.get(id);
	}

	public void delete(User user) {
		users.remove(user.getId());
	}

	public void update(User user) {
		users.put(user.getId(), user);
	}

	public ImmutableList<String> getDepartments() {
		return departments;
	}

	private InputSupplier<InputStreamReader> newInputSupplier() {
		return CharStreams.newReaderSupplier(new InputSupplier<InputStream>() {
			@Override
			public InputStream getInput() throws IOException {
				return new InflaterInputStream(randomdata.getInputStream(), new Inflater(true));
			}
		}, StandardCharsets.UTF_8);
	}
}
