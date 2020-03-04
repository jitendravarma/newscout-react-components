import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'

import { Search } from 'newscout';

export class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isSearchOpen: false,
			isSlider: this.props.isSlider,
			isSideOpen: true,
			value: '',
		};
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	sidebartoggle = () => {
		this.setState({
			isSideOpen: !this.state.isSideOpen
		}, function() {
			this.props.isSideOpen(this.state.isSideOpen)
		})
	}

	toggleSearch = () => {
		this.setState({
			isSearchOpen: !this.state.isSearchOpen
		})
	}

	keyPress = (e) => {
		var url = this.props.url+"?q="+this.state.value;
		if(e.keyCode == 13){
			window.location.href = url;
		}
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	}

	render(){
		
		const { multiple, placeholder, options, url, isSlider, domain, navitems, logo } = this.props;

		if(this.state.isSearchOpen === true){
			document.getElementsByTagName("body")[0].style = "overflow:hidden";
		} else {
			document.getElementsByTagName("body")[0].style = "overflow:auto";
		}

		const menu = navitems.map((item, index) => {
			var menuitem = item.itemtext.replace(/ /g, "-").toLowerCase()
			return (
				<NavItem key={index} className="d-block d-md-none">
					<NavLink href={`/news/${menuitem}`}>
						<img src={`/${item.item_icon}`} alt={item.itemtext} className="menu-icons"/>&nbsp;
						{item.itemtext}
					</NavLink>
				</NavItem>
			)
		})

		return(
			<React.Fragment>
				<Navbar className="fixed-top" expand="md">
					{isSlider ?
						<React.Fragment>
							<div className="sidebar-btn d-none d-sm-block pl-1" onClick={this.sidebartoggle}><FontAwesomeIcon icon={faBars} size="lg" /></div>
						</React.Fragment>
					: ""
					}
					<NavbarBrand href="/" className="ml-4">
						<img src={logo} alt="newscout" />
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} className="custom-toggler" />
					<Collapse isOpen={this.state.isOpen} navbar>
						<div className="m-auto col-lg-6">
							<Nav className="ml-auto" navbar id="menu">
								<InputGroup className="search-box">
									<input type="text" className="form-control" onChange={this.handleChange} onKeyDown={this.keyPress} placeholder="Search" value={this.state.value} />
									<InputGroupAddon addonType="append">
										<InputGroupText><FontAwesomeIcon icon={faSearch} /></InputGroupText>
									</InputGroupAddon>
								</InputGroup>
								
								{domain === "domain=newscout" || domain === undefined ?
									<React.Fragment>
										<NavItem className="d-block d-md-none">
											<NavLink href="/news/trending/">
											<img src="/static/icons/trending_news.png" alt="Trending" className="menu-icons"/>&nbsp;
											Trending
											</NavLink>
										</NavItem>
									</React.Fragment>
								: ""
								}
								{menu}
							</Nav>
						</div>
					</Collapse>
				</Navbar>
				<Search toggleSearch={this.toggleSearch}
						isSearchOpen={this.state.isSearchOpen}
						multiple={multiple}
						placeholder={placeholder}
						options={options}
						url={url} />
			</React.Fragment>
		)
	}
}